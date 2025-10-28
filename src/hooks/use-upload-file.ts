import { ToastWarning } from "@/components/Toasts/ToastWarning";
import { createApi } from "@/services/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { ToastSuccess } from "@/components/Toasts/ToastSuccess";
import { AxiosError } from "axios";
import { IImages } from "@/models/IImages";

export const UseUploadFile = (
  type: string,
  comment: string,
  renderComments: () => void
) => {
  const method: { [key: string]: string } = {
    create: "create",
    update: "update",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[] | null>(null);

  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const handleButtonClick = () => {
    const fileInput = document.getElementById(method[type]) as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Имитируем клик по input
    }
  };
  const deteleComment = async (commentId: string) => {
    await api.delete(API_ENDPOINTS.commentDelete + commentId, {
      withCredentials: true,
    });

    renderComments();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files); // Преобразуем FileList в массив
      setFiles(selectedFiles);
    }
  };

  const deleteUploadedImage = (file: File) => {
    const prevFiles = files?.filter((f) => {
      return f != file;
    });
    setFiles(prevFiles || null);
  };

  const sendComment = async (id: string) => {
    if (comment.trimStart() == "" && !files) {
      ToastWarning("Comment is empty!");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", comment);

      if (files)
        files.forEach((file) => {
          formData.append("images", file);
        });

      const res = await api.post(API_ENDPOINTS.commentCreate + id, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) {
        ToastSuccess(type == "create" ? "Comment Posted" : "Comment Updated");

        setFiles(null);
        renderComments();

        setLoading(false);
      }
    } catch (e: unknown) {
      setLoading(false);

      if (e instanceof AxiosError) {
        if (e.response?.data.message !== "Unauthorized")
          ToastWarning(e.response?.data.message);
      }
    }
  };

  const updateComment = async (
    commentId: string,
    comment: string,
    deletedImages: string[] | [],
    commentImages: IImages[] | []
  ) => {
    if (comment.trimStart() == "" && !files && commentImages.toString() == "") {
      deteleComment(commentId);
      ToastWarning("Comment deleted");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", comment);
      if (deletedImages)
        deletedImages.forEach((id) => {
          formData.append("deletedImages", id);
        });
      if (files)
        files.forEach((file) => {
          formData.append("images", file);
        });

      const res = await api.patch(
        API_ENDPOINTS.commentUpdate + commentId,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res) {
        ToastSuccess(type == "create" ? "Comment Posted" : "Comment Updated");

        setFiles(null);
        renderComments();

        setLoading(false);
      }
    } catch (e: unknown) {
      setLoading(false);
      if (e instanceof AxiosError) {
        if (e.response?.data.message !== "Unauthorized")
          ToastWarning(e.response?.data.message);
      }
    }
  };

  return {
    files,
    handleButtonClick,
    handleFileChange,
    deleteUploadedImage,
    sendComment,
    updateComment,
    loading,
  };
};
