import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import Welcome from "@/components/Welcome";

export default function App() {
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
    },
  };

  const formFields = {
    signIn: {
      username: {
        label: (
          <svg
            className="absolute w-6 h-auto mt-5 ml-4"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 19C2.5 19 1 19 1 17.5C1 16 2.5 11.5 10 11.5C17.5 11.5 19 16 19 17.5C19 19 17.5 19 17.5 19H2.5ZM10 10C11.1935 10 12.3381 9.52589 13.182 8.68198C14.0259 7.83807 14.5 6.69347 14.5 5.5C14.5 4.30653 14.0259 3.16193 13.182 2.31802C12.3381 1.47411 11.1935 1 10 1C8.80653 1 7.66193 1.47411 6.81802 2.31802C5.97411 3.16193 5.5 4.30653 5.5 5.5C5.5 6.69347 5.97411 7.83807 6.81802 8.68198C7.66193 9.52589 8.80653 10 10 10Z"
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
      <View padding="xxl">
        <Authenticator formFields={formFields} components={components}>
          <div>
            <main>
              <Welcome />
            </main>
          </div>
        </Authenticator>
      </View>
    </ThemeProvider>
  );
}
