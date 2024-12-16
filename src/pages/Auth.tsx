import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Mail, Lock } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#000000e6] p-6 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-center mb-6 text-white">Orion Manufacturing</h1>
          <div className="relative">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#bf7a8c',
                      brandAccent: '#a66475',
                      inputBackground: '#333333',
                    },
                  },
                },
                className: {
                  input: 'pl-10 relative',
                  container: 'gap-3',
                  button: 'py-2',
                },
              }}
              providers={[]}
            />
            <Mail className="absolute text-gray-400 left-3 top-[59px] h-5 w-5 pointer-events-none" />
            <Lock className="absolute text-gray-400 left-3 top-[127px] h-5 w-5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;