import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Mail, Lock } from "lucide-react";
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
        <div className="bg-[#000000e6] p-4 md:p-6 rounded-lg shadow-sm">
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
                  input: 'pl-10',
                  container: 'gap-3',
                  button: 'py-2',
                }
              }}
              providers={[]}
              theme="dark"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                  },
                },
              }}
              {...{
                onError: (error) => {
                  toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: error.message,
                  });
                },
              }}
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