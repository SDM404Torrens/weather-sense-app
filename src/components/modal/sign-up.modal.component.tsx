import SignUpForm from "../form/sign-up.form.component";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  if (!isOpen) return null;
  return (
    <div
      id="sign-up-modal"
      tabIndex={-1}
      aria-hidden={!isOpen}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200/50 rounded-t">
            <h3 className="text-xl font-semibold text-gray-800">Sign Up</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-blue-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-100/50"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <SignUpForm onClose={onClose} />
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200/50 rounded-b">
            <span className="text-sm font-medium text-gray-700 drop-shadow-sm">
              Already have an account?
            </span>
            <button
              type="button"
              onClick={onLoginClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 ml-2 transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
