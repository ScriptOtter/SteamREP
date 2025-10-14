import { Container } from "@/components/container";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const Privacy_Settings = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <Container className="h-screen">
          <p className="text-left text-4xl text-white">Privacy Settings</p>
          <div className="w-full h-[1px] bg-light-gray my-8"></div>
          <div className="text-white">
            <p className="mb-4">
              We use technologies (e.g. cookies) to store and/or access
              information on user's devices in order to process personal data
              such as IP addresses or browsing data.{" "}
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
