import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import {
  Authenticator,
  Theme,
  ThemeProvider,
  View,
  components,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react";
import getGeolocation from "@/utils/getGeolocation";
import type { Schema } from "@/amplify/data/resource";
import type { Location } from "@/types/Location";
import RefinedMap from "@/components/mapping/RefinedMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import NavBar from "@/components/navbar/NavBar";
import { WeeklyFront } from "@/components/mapping/WeeklyFront";
import Weekly from "@/components/mapping/Weekly";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=026ea7877a22ff3a2dd720539706c117&units=metric`
  );
  const data = await response.json();
  return data;
};

const setWeatherIcon = async (id: string) => {
  const response = await fetch(
    `https://openweathermap.org/img/wn/${id}@2x.png`
  );
  const data = await response.blob();
  return URL.createObjectURL(data);
};

export default function App() {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherIcon, setWeatherIconUrl] = useState<string | undefined>(
    undefined
  );
  const [showWeekly, setShowWeekly] = useState<boolean>(false);

  const MAP_API_KEY = process.env.NEXT_PUBLIC_GMAPS_UNRESTRICTED;
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getGeolocation();
        setLocation(loc);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const getWeatherData = async () => {
        const data = await fetchWeather(location.latitude, location.longitude);
        setWeatherData(data);
        const iconUrl = await setWeatherIcon(data.weather[0].icon);
        setWeatherIconUrl(iconUrl);
      };
      getWeatherData();
    }
  }, [location]);
  const { tokens } = useTheme();
  const components = {
    Header() {
      return (
        <div className="flex flex-col items-center space-y-2 mb-12">
          <svg
            className="w-16 h-auto md:w-24 lg:w-32"
            viewBox="0 0 507 459"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M339.49 0L9.27117 250.964C10.1656 251.863 11.0074 252.829 11.7908 253.86C23.2189 268.897 17.9208 292.196 0 306.172L111.83 453.319C130.094 439.797 153.96 440.932 165.387 455.968C165.904 456.649 166.388 457.347 166.837 458.06L496.835 207.263C496.268 206.639 495.724 205.987 495.207 205.305C483.778 190.268 489.077 166.968 506.999 152.991L395.167 5.84223C376.902 19.3697 353.032 18.2368 341.603 3.19843C340.821 2.16912 340.117 1.1011 339.49 0ZM242.54 153.224L289.313 129.275L310.464 81.1715L347.695 118.255L399.98 123.506L376.217 170.374L387.38 221.722L335.462 213.605L290.076 240.089L281.753 188.205L242.54 153.224ZM170.72 399.455C179.381 388.13 177.222 371.928 165.897 363.267C154.572 354.606 138.369 356.765 129.708 368.09C121.047 379.415 123.207 395.617 134.532 404.279C145.857 412.94 162.059 410.78 170.72 399.455ZM186.131 284.864C197.456 293.525 199.615 309.727 190.954 321.052C182.293 332.377 166.091 334.537 154.766 325.876C143.441 317.214 141.281 301.012 149.942 289.687C158.603 278.362 174.806 276.203 186.131 284.864ZM236.257 261.811C244.918 250.486 242.758 234.284 231.433 225.623C220.108 216.962 203.906 219.122 195.245 230.447C186.584 241.772 188.743 257.974 200.069 266.635C211.394 275.296 227.596 273.137 236.257 261.811Z"
              fill="#4A37BE"
            />
          </svg>

          <h1 className="text-purple font-bold text-5xl md:text-7xl lg:text-8xl">
            Traffle
          </h1>
        </div>
      );
    },

    SignIn: {
      Header() {
        return (
          <p className="font-medium flex w-fill justify-center text-2xl pt-6">
            Welcome back 👋
          </p>
        );
      },
      Footer() {
        const { toSignUp } = useAuthenticator();
        const { toForgotPassword } = useAuthenticator();
        return (
          <div className="flex flex-col text-center align-center justify-center text-sm pe-0]">
            <span>
              Don't have an account?
              <button
                className="text-purple font-bold bg-transparent pl-1 border-none"
                onClick={toSignUp}
              >
                Sign up
              </button>
            </span>
            <button
              onClick={toForgotPassword}
              className="text-black bg-transparent pl-1 border-none"
            >
              Forgot your password?
            </button>
          </div>
        );
      },
    },
    Footer() {
      return (
        <div className="relative w-full">
          <svg
            className="fixed bottom-0 right-0 max-w-96"
            viewBox="0 0 332 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M285.858 84.2271L164.844 84.2271C164.893 84.5933 164.918 84.9654 164.918 85.3424C164.918 90.8525 159.575 95.3292 152.945 95.4127L152.945 149.34C159.575 149.423 164.919 153.9 164.919 159.41C164.919 159.659 164.908 159.906 164.886 160.151L285.818 160.151C285.796 159.906 285.785 159.659 285.785 159.41C285.785 153.899 291.13 149.422 297.76 149.339L297.76 95.4132C291.129 95.3312 285.784 90.8539 285.784 85.3428C285.784 84.9657 285.809 84.5934 285.858 84.2271Z"
              fill="#4A37BE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M132.913 84.2271L11.899 84.2271C11.9477 84.5933 11.9727 84.9654 11.9727 85.3424C11.9727 90.8525 6.62955 95.3292 0 95.4127L0 149.34C6.63002 149.423 11.9737 153.9 11.9737 159.41C11.9737 159.659 11.9628 159.906 11.9413 160.151L132.873 160.151C132.851 159.906 132.84 159.659 132.84 159.41C132.84 153.899 138.185 149.422 144.815 149.339L144.815 95.4132C138.184 95.3311 132.839 90.8539 132.839 85.3428C132.839 84.9657 132.864 84.5934 132.913 84.2271Z"
              fill="#4A37BE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M438.802 84.2271L317.788 84.2271C317.836 84.5933 317.861 84.9654 317.861 85.3424C317.861 90.8525 312.518 95.3292 305.889 95.4127L305.889 149.34C312.519 149.423 317.863 153.9 317.863 159.41C317.863 159.659 317.852 159.906 317.83 160.151L438.762 160.151C438.74 159.906 438.729 159.659 438.729 159.41C438.729 153.899 444.073 149.422 450.704 149.339L450.704 95.4132C444.073 95.331 438.728 90.8539 438.728 85.3428C438.728 84.9657 438.753 84.5934 438.802 84.2271Z"
              fill="#4A37BE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M377.21 0L256.196 0C256.245 0.366183 256.27 0.738279 256.27 1.11521C256.27 6.62537 250.926 11.102 244.297 11.1855L244.297 65.1111C250.927 65.1942 256.271 69.671 256.271 75.1815C256.271 75.4311 256.26 75.6786 256.238 75.9237L377.17 75.9237C377.148 75.6786 377.137 75.4311 377.137 75.1815C377.137 69.6708 382.481 65.1939 389.112 65.1111L389.112 11.1856C382.481 11.1034 377.136 6.62624 377.136 1.11521C377.136 0.738275 377.161 0.366181 377.21 0Z"
              fill="#4A37BE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M224.264 0L103.25 0C103.299 0.366183 103.324 0.738279 103.324 1.11521C103.324 6.62532 97.9811 11.1019 91.3516 11.1855L91.3516 65.1111C97.9815 65.1943 103.325 69.6711 103.325 75.1815C103.325 75.4311 103.314 75.6786 103.293 75.9237L224.224 75.9237C224.203 75.6786 224.192 75.4311 224.192 75.1815C224.192 69.6708 229.536 65.1938 236.167 65.1111L236.167 11.1856C229.535 11.1035 224.191 6.62628 224.191 1.11521C224.191 0.738275 224.216 0.366181 224.264 0Z"
              fill="#4A37BE"
            />
            <path
              d="M145.663 25.6952L159.75 25.6183L170.625 16.665L175.051 30.0383L186.927 37.6146L175.576 45.9566L172.04 59.5924L160.599 51.3748L146.538 52.2258L150.818 38.805L145.663 25.6952Z"
              fill="white"
            />
          </svg>
        </div>
      );
    },
  };

  const formFields = {
    signIn: {
      username: {
        label: (
          <svg
            className="absolute w-5 h-auto mt-6 ml-4"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.046875 1.42542C0.141392 1.02047 0.373739 0.658912 0.705864 0.399949C1.03799 0.140987 1.4502 -2.79532e-05 1.875 4.15629e-09H13.125C13.5498 -2.79532e-05 13.962 0.140987 14.2941 0.399949C14.6263 0.658912 14.8586 1.02047 14.9531 1.42542L7.5 5.8795L0.046875 1.42542ZM0 2.47225V8.98425L5.44031 5.72275L0 2.47225ZM6.33844 6.26083L0.179063 9.95225C0.331244 10.266 0.571431 10.5311 0.87167 10.7165C1.17191 10.902 1.51985 11.0003 1.875 11H13.125C13.4801 11.0001 13.8279 10.9016 14.128 10.7159C14.428 10.5303 14.668 10.2651 14.82 9.95133L8.66062 6.25992L7.5 6.95383L6.33844 6.26083ZM9.55969 5.72367L15 8.98425V2.47225L9.55969 5.72367Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your email",
        isRequired: true,
      },
      password: {
        label: (
          <svg
            className="absolute w-4 h-auto mt-5 ml-4"
            viewBox="0 0 14 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.30771C7.74261 1.30771 8.4548 1.58326 8.9799 2.07375C9.505 2.56424 9.8 3.22948 9.8 3.92313V5.23061H4.2V3.92313C4.2 3.22948 4.495 2.56424 5.0201 2.07375C5.5452 1.58326 6.25739 1.30771 7 1.30771ZM11.2 5.23061V3.92313C11.2 2.88265 10.7575 1.88479 9.96985 1.14906C9.1822 0.413329 8.11391 0 7 0C5.88609 0 4.8178 0.413329 4.03015 1.14906C3.2425 1.88479 2.8 2.88265 2.8 3.92313V5.23061C2.05739 5.23061 1.3452 5.50616 0.820101 5.99665C0.294999 6.48713 0 7.15238 0 7.84603V14.3846C0 15.0782 0.294999 15.7435 0.820101 16.234C1.3452 16.7244 2.05739 17 2.8 17H11.2C11.9426 17 12.6548 16.7244 13.1799 16.234C13.705 15.7435 14 15.0782 14 14.3846V7.84603C14 7.15238 13.705 6.48713 13.1799 5.99665C12.6548 5.50616 11.9426 5.23061 11.2 5.23061Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your password",
        hideShowPassword: true,
        isRequired: true,
      },
    },
    signUp: {
      email: {
        label: (
          <svg
            className="absolute w-5 h-auto mt-6 ml-4"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.046875 1.42542C0.141392 1.02047 0.373739 0.658912 0.705864 0.399949C1.03799 0.140987 1.4502 -2.79532e-05 1.875 4.15629e-09H13.125C13.5498 -2.79532e-05 13.962 0.140987 14.2941 0.399949C14.6263 0.658912 14.8586 1.02047 14.9531 1.42542L7.5 5.8795L0.046875 1.42542ZM0 2.47225V8.98425L5.44031 5.72275L0 2.47225ZM6.33844 6.26083L0.179063 9.95225C0.331244 10.266 0.571431 10.5311 0.87167 10.7165C1.17191 10.902 1.51985 11.0003 1.875 11H13.125C13.4801 11.0001 13.8279 10.9016 14.128 10.7159C14.428 10.5303 14.668 10.2651 14.82 9.95133L8.66062 6.25992L7.5 6.95383L6.33844 6.26083ZM9.55969 5.72367L15 8.98425V2.47225L9.55969 5.72367Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your email",
        isRequired: true,
      },
      password: {
        label: (
          <svg
            className="absolute w-4 h-auto mt-5 ml-4"
            viewBox="0 0 14 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.30771C7.74261 1.30771 8.4548 1.58326 8.9799 2.07375C9.505 2.56424 9.8 3.22948 9.8 3.92313V5.23061H4.2V3.92313C4.2 3.22948 4.495 2.56424 5.0201 2.07375C5.5452 1.58326 6.25739 1.30771 7 1.30771ZM11.2 5.23061V3.92313C11.2 2.88265 10.7575 1.88479 9.96985 1.14906C9.1822 0.413329 8.11391 0 7 0C5.88609 0 4.8178 0.413329 4.03015 1.14906C3.2425 1.88479 2.8 2.88265 2.8 3.92313V5.23061C2.05739 5.23061 1.3452 5.50616 0.820101 5.99665C0.294999 6.48713 0 7.15238 0 7.84603V14.3846C0 15.0782 0.294999 15.7435 0.820101 16.234C1.3452 16.7244 2.05739 17 2.8 17H11.2C11.9426 17 12.6548 16.7244 13.1799 16.234C13.705 15.7435 14 15.0782 14 14.3846V7.84603C14 7.15238 13.705 6.48713 13.1799 5.99665C12.6548 5.50616 11.9426 5.23061 11.2 5.23061Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your password",
        hideShowPassword: true,
        isRequired: true,
      },
      confirm_password: {
        label: (
          <svg
            className="absolute w-4 h-auto mt-5 ml-4"
            viewBox="0 0 14 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.30771C7.74261 1.30771 8.4548 1.58326 8.9799 2.07375C9.505 2.56424 9.8 3.22948 9.8 3.92313V5.23061H4.2V3.92313C4.2 3.22948 4.495 2.56424 5.0201 2.07375C5.5452 1.58326 6.25739 1.30771 7 1.30771ZM11.2 5.23061V3.92313C11.2 2.88265 10.7575 1.88479 9.96985 1.14906C9.1822 0.413329 8.11391 0 7 0C5.88609 0 4.8178 0.413329 4.03015 1.14906C3.2425 1.88479 2.8 2.88265 2.8 3.92313V5.23061C2.05739 5.23061 1.3452 5.50616 0.820101 5.99665C0.294999 6.48713 0 7.15238 0 7.84603V14.3846C0 15.0782 0.294999 15.7435 0.820101 16.234C1.3452 16.7244 2.05739 17 2.8 17H11.2C11.9426 17 12.6548 16.7244 13.1799 16.234C13.705 15.7435 14 15.0782 14 14.3846V7.84603C14 7.15238 13.705 6.48713 13.1799 5.99665C12.6548 5.50616 11.9426 5.23061 11.2 5.23061Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your password",
        hideShowPassword: true,
        isRequired: true,
      },
    },
    forgotPassword: {
      username: {
        label: (
          <svg
            className="absolute w-5 h-auto mt-6 ml-4"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.046875 1.42542C0.141392 1.02047 0.373739 0.658912 0.705864 0.399949C1.03799 0.140987 1.4502 -2.79532e-05 1.875 4.15629e-09H13.125C13.5498 -2.79532e-05 13.962 0.140987 14.2941 0.399949C14.6263 0.658912 14.8586 1.02047 14.9531 1.42542L7.5 5.8795L0.046875 1.42542ZM0 2.47225V8.98425L5.44031 5.72275L0 2.47225ZM6.33844 6.26083L0.179063 9.95225C0.331244 10.266 0.571431 10.5311 0.87167 10.7165C1.17191 10.902 1.51985 11.0003 1.875 11H13.125C13.4801 11.0001 13.8279 10.9016 14.128 10.7159C14.428 10.5303 14.668 10.2651 14.82 9.95133L8.66062 6.25992L7.5 6.95383L6.33844 6.26083ZM9.55969 5.72367L15 8.98425V2.47225L9.55969 5.72367Z"
              fill="black"
            />
          </svg>
        ),
        placeholder: "Enter your email",
        isRequired: true,
      },
    },
  };

  const theme: Theme = {
    name: "Traffle Authentication template",
    tokens: {
      components: {
        authenticator: {
          router: {
            borderColor: "transparent",
            boxShadow: "none",
          },
          form: {},
        },
        button: {
          paddingInlineEnd: "50px",
          primary: {
            backgroundColor: "#f2d93d",
            color: tokens.colors.black,
            _hover: {
              backgroundColor: "#4A37BE",
              color: tokens.colors.white,
            },
            _active: {
              backgroundColor: "#332491",
              color: tokens.colors.white,
            },
          },
          link: {
            color: "black",
            _hover: {
              backgroundColor: "#4A37BE",
              color: tokens.colors.white,
              borderColor: "#f2d93d",
            },
          },
        },
        fieldcontrol: {
          borderRadius: "100px",
          lineHeight: "30px",
          paddingInlineStart: "50px",
          _focus: {
            boxShadow: `0 0 0 2px #4A37BE`,
          },
        },
        tabs: {
          borderStyle: "none none solid none",
          borderColor: "transparent transparent #4A37BE transparent",
          borderWidth: "0, 0, 2px, 0",
          item: {
            borderStyle: "none none solid none",
            borderColor: "transparent transparent #4A37BE transparent",
            borderWidth: "0, 0, 2px, 0",
            color: "#9486DE",
            _active: {
              backgroundColor: "#4A37BE",
              color: tokens.colors.white,
              borderColor: "#4A37BE",
            },
            _hover: {
              color: "#f2d93d",
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <View padding="xxl" className="w-screen h-screen bg-white p-0 m-0">
        <Authenticator formFields={formFields} components={components}>
          {({ user }) => (
            <div>
              <main>
                <div
                  style={{
                    display: "flex",
                    gap: "0.25rem",
                    flexDirection: "row",
                  }}
                >
                  {MAP_API_KEY ? (
                    <APIProvider apiKey={MAP_API_KEY}>
                      <RefinedMap location={location} />
                    </APIProvider>
                  ) : (
                    <p>Unable to find API key to load Google Maps</p>
                  )}
                </div>
              </main>
              <WeeklyFront />
              <NavBar />
            </div>
          )}
        </Authenticator>
      </View>
    </ThemeProvider>
  );
}
