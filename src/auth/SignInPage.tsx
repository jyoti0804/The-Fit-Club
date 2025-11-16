import { SignIn } from "@clerk/clerk-react";
import bgImage from "../assets/image3.png";

export default function SignInPage() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay to make the blur + image look cleaner */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      <div className="relative p-4 rounded-xl">
        <SignIn
          routing="path"
          path="/sign-in"
         signUpUrl="/sign-up"
          afterSignInUrl="/plans"  
          afterSignUpUrl="/plans"   
          appearance={{
            elements: {
              card: "bg-[#111] border border-gray-800 shadow-xl",
              formButtonPrimary:
                "bg-orange-500 hover:bg-orange-600 text-white font-semibold",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              input: "bg-zinc-900 border border-zinc-700 text-white",
            },
          }}
        />
      </div>
    </div>
  );
}

