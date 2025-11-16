import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white font-semibold",
            card: "bg-[#111] border border-gray-800 shadow-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton:
              "bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800",
            footer: "hidden",
            input: "bg-zinc-900 border border-zinc-700 text-white",
          },
        }}
      />
    </div>
  );
}
