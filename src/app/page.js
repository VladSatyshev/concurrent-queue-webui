"use client";

import { ConsumeForm, PutMessageForm, SubscribeForm } from "@/components/forms";
import { GetQueue } from "@/components/queues";

const MainPage = () => {
  return (
    <>
      <SubscribeForm />
      <ConsumeForm />
      <PutMessageForm />
      <GetQueue />
    </>
  );
};

export default MainPage;
