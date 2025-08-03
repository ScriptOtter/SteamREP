import { backgroundColors } from "@/styles/colors";
import { Header } from "../views/Header";
import { Container } from "@/component/container";
import { SiteFeature } from "@/component/HomePage/SiteFeature";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div
        className={
          backgroundColors.main + "h-full min-h-screen pt-8 flex justify-center"
        }
      >
        <Container>
          <div className="flex justify-center items-center">
            <div className="mx-1 md:mx-4">
              <div className="text-white">
                <p className=" text-4xl text-center mt-4">STEAM REP</p>
                <p className="text-3xl text-center mt-2">Welcome</p>

                <p className="text-xl text-center mt-2">
                  Become a part of our community. Influence the reputation of
                  Steam users: report Cheats and Fraud.
                </p>
              </div>

              <SiteFeature
                title="Узнавай все данные Steam"
                description="Сайт SteamREP позволяет отображать актуальную публичную и информацию Steam, Steam Bans and Restrictions, а также количество просмотров вашего профиля через наш сайт."
                image="/public/assets/ProfileFeature.png"
              />
              <SiteFeature
                title="Оставляй комментарии пользователям"
                description="Авторизованные пользователи сайта SteamREP имеют возможность оставлять комментарии любому Steam пользователю, даже если этот Steam профиль скрыт."
                image="/public/assets/CommentFeature.png"
              />
              <SiteFeature
                title="Система Патруля CS2"
                description="Пользователи SteamREP могут отсматривать и загружать свои CS2 demo в нашу систему для помощи комьюнити в поиске читеров. Каждый пользователь имеет право оставить свой вердикт о подозреваемом для дальнейшего опубликования Steam аккаунта."
                image="/public/assets/ReportFeature.png"
              />
              <SiteFeature
                title=""
                description=" Вы можете закрепить профиль игроков и отслеживать их в
                    реальном времени"
              />
              <div>
                <p>Помогай комьюнити</p>
                <div>Оставляй репорты на игроков</div>
                <div>Помечай скамеров</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <footer>asdsadsa</footer>
    </>
  );
};
