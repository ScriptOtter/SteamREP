import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const BlogPage = () => {
  const updates = [
    {
      version: "1.0.0",
      date: "01.11.2025",
      type: "Global Update",
      description: "Welcome to SteamRep! The main features of the site.",

      featureGroups: [
        {
          title: "Interacting with CS2",
          features: [
            "Access statistics from recent matches, including ranks, ratings, and shooting information",
            "Submitting reports to Steam game profiles with evidence attached",
            "Track players' private ranks, likes, and medals directly from our website",
          ],
        },
        {
          title: "Interacting with the Steam platform",
          features: [
            "The ability to leave and track genuine comments on user profiles, including private accounts",
            "Monitoring user gaming and trading bans",
            "Easily retrieve user IDs, including SteamID, SteamID2, SteamID3, and SteamID64Hex",
          ],
        },

        {
          title: "Additional features",
          features: [
            "We check our Steam account database daily for VAC bans",
            "Save and monitor Steam accounts in one convenient place",
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Header />
      <div className={"flex justify-center mb-[15%]"}>
        <Container>
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-white ">
              Latest updates and new features
            </h1>
            {updates.map((update) => (
              <div
                key={update.version}
                className={cn(
                  update.type.includes("Глобальное")
                    ? "border-blue-600"
                    : "border-green-500",
                  "mb-8 border-l-4 p-4 rounded-lg outline-1 outline-light-gray-2 "
                )}
              >
                <h2 className="text-3xl font-semibold text-white ">{`${update.type} ${update.version} - ${update.date}`}</h2>
                <p className="text-purple-active mt-2 text-xl font-semibold">
                  {update.description}
                </p>
                <ul className="list-disc list-inside mt-2 text text-white">
                  {update.featureGroups.map((data) => (
                    <div className="mb-2">
                      <p className="text-xl font-semibold mb-1">{data.title}</p>
                      {data.features.map((feature, index) => (
                        <li className="text-[16px]" key={index}>
                          {feature}
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
