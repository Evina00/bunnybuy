import "remixicon/fonts/remixicon.css";


function Contact() {

    return (<>
    <section className="bg-[#FFFBEA] py-40 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-2">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-orange-500 text-5xl font-bold">＼</span>
              <h2 className="text-5xl font-bold leading-snug text-[#6B4B2A]">
                聯絡<br />我們
              </h2>
              <span className="text-orange-500 text-5xl font-bold">／</span>
            </div>
            <div className="flex gap-6 mb-8 ">
              <ul className="space-y-4  flex justify-center content-center gap-6">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="no-underline hover:opacity-80 transition "
                >
                  <i className="ri-facebook-box-fill text-4xl text-[#6B4B2A]"></i>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className=" no-underline hover:opacity-80 transition"
                >
                  <i className="ri-instagram-fill text-4xl text-[#6B4B2A]"></i>
                </a>
                
              </li>
              <li>
                <a
                  href="https://github.com/Evina00/bunnybuy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="no-underline hover:opacity-80 transition"
                >
                  <i className="ri-github-fill text-4xl text-[#6B4B2A]"></i>
                </a>
              </li>
            </ul>

            </div>
            <div className="space-y-4 text-[#6B4B2A] font-semibold">
              <div className="flex items-center gap-3">
                <i className="ri-phone-fill"></i>
                <span>04-222-333</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-mail-fill"></i>
                <span>rabibunny@gmail.com</span>
              </div>
            </div>
          </div>

        <div className="flex-1">
        <div className="w-full h-[360px] rounded-3xl overflow-hidden bg-gray-200">
        <iframe
         title="Rabibunny 店面位置 Google 地圖"
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232935.97345265697!2d120.46991814344695!3d24.184895461205503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d65575df2d1%3A0x8dd494fb51747b0a!2z6Ie65Lit5biC5YyX5Y2A6Ie65Lit!5e0!3m2!1szh-TW!2stw!4v1769608367572!5m2!1szh-TW!2stw"
         className="w-full h-full border-0"
         allowFullScreen
         loading="lazy"
         referrerPolicy="no-referrer-when-downgrade"
         />
         </div>
        </div>
        </div>
      </div>
    </section>
    </>)
}

export default Contact;