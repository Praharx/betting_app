import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios"
import { cn } from "@/lib/utils";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Modal({ modalSize = "lg",isLogged, setIsLogged, isOpen, setIsOpen }: { isLogged: any, setIsLogged: any, modalSize?: "sm" | "lg", isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>  }) {
  const {signMessage, publicKey} = useWallet() ;
  const { setVisible: setModalVisible } = useWalletModal();
  async function signAndSend(route: string) {
    try {
      const message = new TextEncoder().encode(
        `You're a verified exceliWorker`
      );
      const signature = await signMessage?.(message);
      console.log(signature);

      const response = await axios.post(
        `${window.location.origin}/api/${route}`,
        {
          signature,
          pubKey: publicKey?.toString(),
        }
      );

      if (!response.data.success) {
        alert("Invalid user creds");
        return;
      }
      alert(route == "signin" ? "Signed in successfully" : "Signed up successfully");
      setIsOpen(false)
      setIsLogged(true)
    } catch (err) {
      alert("Unable to verify User");
      return;
    }
  }
  return (
    <div>
     

      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: "180deg" }}
              animate={{
                scale: 1,
                rotate: "0deg",
                transition: {
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              exit={{ scale: 0, rotate: "180deg" }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-lg cursor-default overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 p-6 text-white shadow-2xl",
                {
                  "max-w-sm": modalSize === "sm",
                },
              )}
            >
              <div className="flex flex-col gap-3">
                <CircleAlert className="mx-auto text-white" size={48} />
                <h3
                  className={cn("text-center text-3xl font-bold", {
                    "text-2xl": modalSize === "sm",
                  })}
                >
                  Welcome to the betting game!
                </h3>
                <p className="mb-1 text-center">
                 Please Signup/ signin to continue...
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      signAndSend("signup")
                    }}
                    className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => {
                      signAndSend("signin")
                    }}
                    className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                  >
                    Sign in
                  </button>
                 <span
                      onClick={() => {
                        setModalVisible(true);
                      }}
                      className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80 text-center"
                    >
                      Select Wallet
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
