import Feed from "@components/Feed";

const Home = () => {
  return (
    <div>
          <section className="w-full flex-center flex-col"> 
              <h1 className="head_text text-center">Discover and Share!
                  <br className="max-md:hidden"/>
                  <span className="brown_gradient text-center">AI Powered Prompts</span>

              </h1>
              <p className="desc text-center font-courier">
                  PromptCraft is an open-source AI prompting tool for modern world to discover, create and share cool crafted prompts!
              </p>
              <Feed />
      </section>
    </div>
  )
}

export default Home
