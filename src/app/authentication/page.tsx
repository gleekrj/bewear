import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5 md:mx-auto md:max-w-md md:px-0 md:py-12">
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="sign-in" className="flex-1">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="flex-1">
              Criar Conta
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;
