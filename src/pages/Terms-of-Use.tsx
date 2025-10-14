import { Container } from "@/components/container";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const Terms_of_Use = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <Container className="h-screen">
          <p className="text-left text-4xl text-white">Terms of Use</p>
          <div className="w-full h-[1px] bg-light-gray my-8"></div>
          <div className="text-white">
            <p className="text-2xl">1. Introduction</p>
            <p className="text-xl mb-4">
              Welcome to our website. By using our site, you agree to these
              terms of use. If you do not agree with these terms, please do not
              use our site.
            </p>
            <p className="text-2xl">2. Changes to the Terms </p>
            <p className="text-xl mb-4">
              We may occasionally update these terms. All changes will be posted
              on this page, and your continued use of the site will be
              considered acceptance of the changes.
            </p>
            <p className="text-3xl">3. Use of the Site </p>
            <p className="text-xl mb-4">
              You agree to use our site only for lawful purposes and not to
              infringe on the rights of other users. Posting inappropriate,
              offensive, or illegal content is prohibited.
            </p>
            <p className="text-3xl">4. Intellectual Property </p>
            <p className="text-xl mb-4">
              All materials on our site are protected by copyright and other
              intellectual property laws. You may not copy, distribute, or
              modify materials without our permission.
            </p>
            <p className="text-3xl">5. Limitation of Liability </p>
            <p className="text-xl mb-4">
              We are not liable for any losses or damages arising from your use
              of our site. Use of the site is at your own risk.
            </p>
            <p className="text-3xl">6. Governing Law </p>
            <p className="text-xl mb-28">
              These terms are governed by the laws of your country. Any disputes
              arising in connection with these terms shall be subject to the
              jurisdiction of the appropriate courts.
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
