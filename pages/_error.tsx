import { NextPageContext } from "next";
import Link from "next/link";
import Error from "next/error";
import * as Sentry from "@sentry/nextjs";

import FullHeightContainer from "components/atoms/FullHeightContainer/full-height-container";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import BubbleBG from "../img/bubble-bg.svg";

function Custom500() {
  return (
    <FullHeightContainer className="text-white">
      <div
        className="grid relative w-full h-full md:pb-20 overflow-hidden max-w-screen"
        style={{
          background: `#010101 url(${BubbleBG.src}) no-repeat center center`,
          backgroundSize: "cover",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <div className="grid items-center justify-center place-content-start py-7 px-4 md:grid-flow-col  md:justify-between">
          <HeaderLogo />
        </div>
        <main id="main" className="grid place-content-center p-6">
          <h1 className="text-8xl font-bold mb-2">500</h1>
          <div className="text-3xl mb-2">uh oh! looks like there&apos;s an issue with the pizza oven</div>
          <Link href="/" className="text-orange-600 hover:text-orange-500">
            Take me home &rarr;
          </Link>
        </main>
      </div>
    </FullHeightContainer>
  );
}

Custom500.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default Custom500;