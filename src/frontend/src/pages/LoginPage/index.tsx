import lGlowLogo from "@/assets/lGlowLogo.jpg";
import AIBlockAnim from "@/assets/AIBlockAnim.gif";
import { useLoginUser } from "@/controllers/API/queries/auth";
import { CustomLink } from "@/customization/components/custom-link";
import * as Form from "@radix-ui/react-form";
import { useContext, useState, useEffect } from "react";
import InputComponent from "../../components/core/parameterRenderComponent/components/inputComponent";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { SIGNIN_ERROR_ALERT } from "../../constants/alerts_constants";
import { CONTROL_LOGIN_STATE } from "../../constants/constants";
import { AuthContext } from "../../contexts/authContext";
import useAlertStore from "../../stores/alertStore";
import { LoginType } from "../../types/api";
import { inputHandlerEventType, loginInputStateType } from "../../types/components";

export default function LoginPage(): JSX.Element {
  const [inputState, setInputState] = useState<loginInputStateType>(CONTROL_LOGIN_STATE);
  const { password, username } = inputState;
  const { login } = useContext(AuthContext);
  const setErrorData = useAlertStore((state) => state.setErrorData);

  function handleInput({ target: { name, value } }: inputHandlerEventType): void {
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  const { mutate } = useLoginUser();

  function signIn() {
    const user: LoginType = { username: username.trim(), password: password.trim() };
    mutate(user, {
      onSuccess: (data) => login(data.access_token, "login", data.refresh_token),
      onError: (error) =>
        setErrorData({ title: SIGNIN_ERROR_ALERT, list: [error["response"]["data"]["detail"]] }),
    });
  }

  useEffect(() => {
    document.title = "lGlow";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.setAttribute("href", lGlowLogo);
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.type = "image/jpg";
      newFavicon.href = lGlowLogo;
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    <Form.Root
      onSubmit={(event) => {
        if (password === "") {
          event.preventDefault();
          return;
        }
        signIn();
        event.preventDefault();
      }}
      className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
    >
      {/* Navigation Bar */}

      <div className="w-full flex justify-between items-center px-6 py-3 border-b border-gray-600">
  <div className="flex items-center">
    <img src={lGlowLogo} alt="lGlow Logo" className="h-12 w-12 rounded-full" />
    <span className="ml-3 text-xl font-bold text-gray-200">lGlow</span>
  </div>
  {/* Menu Items */}
  <div className="flex space-x-6 text-gray-300 text-lg">
    <CustomLink to="/usecases">Use Cases</CustomLink>
    <CustomLink to="/resources">Resources</CustomLink>
    <CustomLink to="/about">About Us</CustomLink>
  </div>
</div>


      {/* Title Text and GIF */}
      <div className="flex items-center justify-between px-12 mt-16">
        <div className="max-w-xl text-white animate-fade-in">
          <h2 className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent shadow-text">
            Transform any workflow with
            <br />
            <span className="text-pink-500 drop-shadow-lg">intelligent AI automation.</span>
          </h2>
          <p className="text-gray-400 mt-3 text-3xl italic shadow-text">Code-free innovation</p>
        </div>
        {/* GIF Section with Blended Background */}
	</div>
{/* GIF Section with Blended Background */}
{/*
<div className="w-[20vw] h-[20vh] flex items-center justify-center rounded-lg shadow-lg overflow-hidden border border-gray-700">
   <img src={AIBlockAnim} alt="AI Animation" className="w-full h-full object-cover" />
</div>
*/}
{/* GIF Section with Blended Background */}

        {/* GIF Section with Blended Background 
        <div className="w-[50vw] h-[50vh] flex items-center justify-center rounded-lg shadow-lg overflow-hidden absolute right-[102px] top-[calc(50%-90px)] transform -translate-y-1/2">
          <img src={AIBlockAnim} alt="AI Animation" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
        </div>
*/}
        {/* GIF Section with Blended Background 
	<div className="w-[50vw] h-[50vh] flex items-center justify-center rounded-lg shadow-lg overflow-hidden absolute right-[0px] top-[calc(50%-90px)] transform -translate-y-1/2">
    <img src={AIBlockAnim} alt="AI Animation" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
</div>
<div className="w-[50vw] h-[50vh] flex items-center justify-end rounded-lg shadow-lg overflow-hidden absolute right-10px top-1/2 transform -translate-y-1/2">
    <img src={AIBlockAnim} alt="AI Animation" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
</div>

<div className="w-[50vw] h-[50vh] flex items-center justify-end rounded-lg shadow-lg overflow-hidden absolute right-[10px] top-[calc(50%-15px)] transform -translate-y-1/2">
    <img src={AIBlockAnim} alt="AI Animation" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
</div>
*/}

<div className="w-[50vw] h-[50vh] flex items-center justify-end rounded-lg shadow-lg overflow-hidden absolute right-[20px] top-[calc(50%-75px)] transform -translate-y-1/2">
    <img src={AIBlockAnim} alt="AI Animation" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
</div>


	{/* Trusted By Section */}

	 <div className="absolute bottom-10 w-full flex justify-center items-center text-gray-300 text-lg space-x-6">
          <span>Trusted by:</span>
          <span className="font-bold text-xl text-white">Sora</span>
          <span className="font-bold text-xl text-white">Webflow</span>
          <span className="font-bold text-xl text-white">Plantuml</span>
        </div>	
{/*
        <div className="absolute bottom-10 w-full flex justify-center items-center text-gray-300 text-lg space-x-6">
          <span>Trusted by:</span>
          <img src="/assets/sora-logo.png" alt="Sora" className="h-6" />
          <img src="/assets/webflow-logo.png" alt="Webflow" className="h-6" />
          <img src="/assets/plantum-logo.png" alt="Plantum" className="h-6" />
        </div>
*/}

      {/* Login Section */}
      <div className="flex flex-grow items-center justify-center">
      	<div className="flex flex-col items-center gap-5 bg-gray-800 p-10 rounded-lg shadow-lg absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
	{/*
          <Form.Field name="username">
            <Input type="text" placeholder="Username" className="h-12 w-72 px-4 py-3 border rounded bg-gray-900 text-white placeholder-gray-400 shadow-glow" value={username} onChange={(e) => handleInput(e)} />
          </Form.Field>
*/}
<Form.Field name="username">
  <Input 
    type="text" 
    name="username"
    placeholder="Username" 
    className="h-12 w-72 px-4 py-3 border rounded bg-gray-900 text-white placeholder-gray-400 shadow-glow" 
    value={username} 
    onChange={(e) => handleInput(e)} 
  />
</Form.Field>


          <Form.Field name="password">
            <InputComponent placeholder="Password" className="h-12 w-72 px-4 py-3 border rounded bg-gray-900 text-white placeholder-gray-400 shadow-glow" isForm password={true} value={password} onChange={(value) => handleInput({ target: { name: "password", value } })} />
          </Form.Field>
        
	


	  <div className="flex space-x-3 mt-4">
            <Form.Submit asChild>
              <Button className="btn-style">Login</Button>
            </Form.Submit>
            <CustomLink to="/signup">
              <Button className="btn-style">Sign Up</Button>
            </CustomLink>
          </div>
        </div>
      </div>
    </Form.Root>
  );
}

