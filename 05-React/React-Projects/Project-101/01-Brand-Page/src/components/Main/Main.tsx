export default function Main() {
  return (
    <main className="w-[1240px]  mx-auto my-8 flex">
      <section className="w-[595px] flex flex-col gap-4 ">
        <h2 className="text-8xl font-bold uppercase">
          Your feet deserves the best
        </h2>
        <p className="font-semibold">
          YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.
        </p>

        <section className="flex gap-12">
          <button className="font-semibold bg-red-600 text-xl text-white px-4">
            Shop Now
          </button>
          <button className="border-2 text-xl font-semibold px-4 border-black">
            Category
          </button>
        </section>
        <section>
          <h3 className="font-semibold">Also available on</h3>
          <div className="flex gap-4 items-center">
            <img src="./images/flipkart.png" alt="flipkart" />
            <img src="./images/amazon.png" alt="amazon" />
          </div>
        </section>
      </section>
      <section>
        <img src="./images/shoe_image.png" alt="" />
      </section>
    </main>
  );
}
