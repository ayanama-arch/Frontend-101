import Button from "./Button";
import { IoMdCall } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import Input from "./Input";
import TextArea from "./TextArea";

export default function Main() {
  return (
    <main className="w-4/5 mx-auto mt-8 ">
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-6xl font-bold">Contact Us</h2>
        <p className="text-lg font-semibold text-gray-600">
          LET’S CONNECT: WE’RE HERE TO HELP, AND WE’D LOVE TO HEAR FROM YOU!
          WHETHER YOU HAVE A QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN
          REACH OUT TO US THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE,
          EMAIL, OR SOCIAL MEDIA.{" "}
        </p>
      </section>
      <div className="flex">
        <div className="w-1/2">
          <section className=" flex flex-col gap-8">
            <section className="flex gap-4">
              <Button
                component={<MdMessage className="text-3xl" />}
                text="Via Support Chat"
                background="bg-black"
                color="text-white"
              />
              <Button
                component={<IoMdCall className="text-3xl" />}
                text="Via Call"
                background="bg-black"
                color="text-white"
              />
            </section>
            <Button
              component={<IoMdCall className="text-3xl" />}
              text="Via Email From"
              background="bg-white"
              color="text-black"
            />
          </section>

          <section className="flex flex-col gap-6 my-12 items-center ">
            <Input label="Name" />
            <Input label="E-mail" />
            <TextArea label="Address" />
            <div className=" ">
              <Button
                component={<div />}
                text="Submit"
                background="bg-black"
                color="text-white"
              />
            </div>
          </section>
        </div>
        <section className="w-1/2">
          <img className="h-full" src="./images/service.svg" alt="service" />
        </section>
      </div>
    </main>
  );
}
