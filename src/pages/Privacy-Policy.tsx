import { Container } from "@/components/container";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const Privacy_Policy = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <Container className="h-screen">
          <p className="text-left text-4xl text-white">Privacy Policy</p>
          <div className="w-full h-[1px] bg-light-gray my-8"></div>
          <div className="text-white">
            <p className="text-2xl mb-4">1 Provision of Statistics </p>
            <p>
              Our service allows players of CSGO to keep a full match history in
              our database, this includes the following data:
            </p>
            <p className=" mb-4">
              <p>
                1. Your game nickname, Steam ID, any bans within Steam
                associated with this account and a link to your profile picture
                you maintain for your Steam Account;
              </p>
              <p>
                2. Statistical data on your interactions within the match (e.g.
                number of kills, deaths, assists, etc.);
              </p>
              <p>
                3. Your Steam account authorization code for us to check and
                collect match metadata;
              </p>
              <p>
                4. Your match share-codes for us to download the match’s public
                game replay file to gather statistical data on your interactions
                within the match
              </p>
              <p className="mb-4">
                5. Please note that the data mentioned under Sect. VIII. 3. a.
                i. and, if applicable also ii is provided to us by Steam, which
                is a product of the Valve Corporation, P.O. Box 1688, Bellevue,
                WA 98009, USA (“Valve”). Valve makes this data that is related
                to your Steam user account available to us over the Steamworks
                API (Application Programming Interface). You can find more
                information on how Valve processes your data and on how to
                configure your individual settings regarding information shared
                over the Steamworks API in Valve’s privacy notice:
                https://store.steampowered.com/privacy_agreement/?snr=1_44_44_
              </p>
              <div>
                <p>
                  If you have enabled the automatic match tracking, you can
                  deactivate the sharing of your matches by Steam within your
                  Steam account. Please note that even though you might
                  deactivate that function within your Steam account, your
                  nickname, profile picture and statistical information of the
                  game you play may still be shared with us by Steam, if one of
                  the other players in a match you play has the sharing function
                  enabled, since the played game is publicly available as an
                  online competition. In such case, please check before you join
                  matches, if other players are intending to compete publicly in
                  the match. If you have enabled your match sharing and wish to
                  revoke this, you can access
                </p>
                <p
                  className="text-light-blue cursor-pointer"
                  onClick={() =>
                    (location.href =
                      "https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128")
                  }
                >
                  https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128
                </p>
                <p>
                  and revoke the match sharing function upon signing into your
                  Steam-account.
                </p>
              </div>
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
