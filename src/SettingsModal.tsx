import { MarkGithubIcon } from "@primer/octicons-react";
import { useState } from "react";
import { Button } from "./Button";
import { borderRadius, colors, timeChallengeTarget } from "./colors";
import { Modal } from "./Modal";

const translationsMap = {
  en: {
    variantsTitle: "Variants",
    variantsExplainer:
      "Five letters comes in multiple variants and languages. You can explore the different versions here.",
    timeChallengeTitle: "Time challenge",
    timeChallengeExplainer: (n: number) =>
      `Challenge yourself to complete ${timeChallengeTarget} games as fast as possible!`,
    startTimeChallenge: "Start time challenge",
  },
};

export const SettingsModal: React.FC<{
  visible: boolean;
  onRequestDismiss: () => void;
  language: "en";
  variant: string;
  startTimeChallenge: () => void;
}> = ({ visible, onRequestDismiss, language, variant, startTimeChallenge }) => {
  const [tab, setTab] = useState<"settings" | "about">("settings");
  const translations = translationsMap[language];
  return (
    <Modal visible={visible} dismiss={onRequestDismiss}>
      <div style={{ margin: "0 auto 32px" }}>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius,
            background: colors.dark,
            padding: 4,
            color: colors.light,
          }}
        >
          {[
            { text: "Settings", key: "settings" as const },
            { text: "About", key: "about" as const },
          ].map((item) => (
            <a
              href="#"
              key={item.key}
              onClick={(e) => {
                e.preventDefault();
                setTab(item.key);
              }}
              style={{
                textDecoration: "none",
                padding: "4px 16px 4px 16px",
                whiteSpace: "nowrap",
                borderRadius: borderRadius - 2,
                background: tab === item.key ? colors.light : "transparent",
                color:
                  tab === item.key ? colors.darkContrastText : colors.light,
              }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>

      {tab === "settings" && (
        <div>
          <div style={{ marginBottom: 16, fontWeight: "bold" }}>
            {translations.variantsTitle}
          </div>

          <div style={{ marginBottom: 32 }}>
            {translations.variantsExplainer}
          </div>

          <select
            className="animate-all"
            style={{
              border: 0,
              outline: 0,
              fontSize: 22,
              lineHeight: 1.33,
              color: colors.black,
              textDecoration: "underline",
              background: colors.light,
              padding: 8,
              borderRadius,
              margin: "0 auto 32px",
            }}
            value={variant}
            onChange={(e) => {
              e.preventDefault();
              window.location.href = e.target.value;
            }}
          >
            <option value="/three">Three</option>
            <option value="/four">Four</option>
            <option value="/">Five</option>
            <option value="/six">Six</option>
          </select>

          <div style={{ marginTop: 16, marginBottom: 16, fontWeight: "bold" }}>
            {translations.timeChallengeTitle}
          </div>
          <div style={{ marginBottom: 32 }}>
            {translations.timeChallengeExplainer(timeChallengeTarget)}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                onRequestDismiss();
                startTimeChallenge();
              }}
            >
              {translations.startTimeChallenge}
            </Button>
          </div>
        </div>
      )}
      {tab === "about" && (
        <>
          {language === "en" && (
            <>
              <div style={{ marginBottom: 32, paddingRight: 8 }}>
                <strong>Five Master</strong> is a cross between{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
                  style={{ color: colors.black }}
                >
                  Mastermind
                </a>{" "}
                and classic word guessing games.
              </div>
              <div style={{ marginBottom: 32, paddingRight: 8 }}>
                The objective of the game is to guess the hidden five letter
                word. For each guess, you will be told how many of the letters
                that you guessed are correct.
              </div>

              <div style={{ paddingRight: 8 }}>
                If you like this game, you should also check out{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Lingo_(American_game_show)"
                  style={{ color: colors.black }}
                >
                  Lingo (game show)
                </a>{" "}
                and{" "}
                <a
                  href="https://www.powerlanguage.co.uk/wordle/"
                  style={{ color: colors.black }}
                >
                  Wordle
                </a>
                .
              </div>

              <div style={{ marginTop: 32 }}>
                <a
                  href="https://github.com/zaidmukaddam/fivemaster"
                  style={{
                    color: colors.black,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MarkGithubIcon size={24} />
                  <div style={{ marginLeft: 8 }}>
                    Follow development on GitHub.
                  </div>
                </a>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};
