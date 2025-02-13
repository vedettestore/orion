import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Clear any existing session data on mount
    const clearSession = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error clearing session:', error);
      }
    };
    
    clearSession();

    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session check error:', error);
        return;
      }
      
      if (session?.user) {
        navigate("/");
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      } else if (event === 'SIGNED_OUT') {
        navigate("/auth");
      } else if (event === 'TOKEN_REFRESHED') {
        // Handle successful token refresh
        if (session) {
          navigate("/");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="bg-[#dde1e7] p-8 rounded-lg shadow-[2px_2px_5px_#BABECC,-5px_-5px_10px_#ffffff73]">
          <h1 className="text-3xl font-semibold text-center mb-8 text-[#595959]">Orion</h1>
          <div className="relative">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3498db',
                      brandAccent: '#2980b9',
                      inputBackground: '#dde1e7',
                      inputBorder: 'transparent',
                      inputText: '#595959',
                      inputPlaceholder: '#666666',
                    },
                  },
                },
                className: {
                  container: 'gap-4',
                  button: 'bg-[#dde1e7] text-[#595959] h-[50px] rounded-[25px] font-semibold shadow-[2px_2px_5px_#BABECC,-5px_-5px_10px_#ffffff73] hover:shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#ffffff73] hover:text-[#3498db]',
                  input: 'h-[50px] w-full pl-[45px] text-lg bg-[#dde1e7] text-[#595959] rounded-[25px] shadow-[inset_2px_2px_5px_#BABECC,inset_-5px_-5px_10px_#ffffff73] focus:shadow-[inset_1px_1px_2px_#BABECC,inset_-1px_-1px_2px_#ffffff73] border-none',
                  label: 'text-[#666666]',
                  loader: 'text-[#3498db]',
                  anchor: 'text-[#3498db] hover:underline',
                }
              }}
              providers={["google"]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                  },
                },
              }}
            />
            <div className="absolute left-3 top-[90px] text-[#595959] w-[50px] leading-[55px]">
              <svg className="w-5 h-5" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z" fill="#595959"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
