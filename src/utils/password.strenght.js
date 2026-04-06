export function checkPasswordStrength(password) {
  let strength = 0;

  const feedback = {
    text: "",
    background: "",
    textColor: "",
    width: ""
  };

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

 switch (strength) {
    case 0:
    case 1:
      feedback.text = "Weak";
      feedback.background = "bg-red-500";
      feedback.textColor = "text-red-700";
      feedback.width = "w-1/5"; // 20%
      break;

    case 2:
      feedback.text = "Fair";
      feedback.background = "bg-orange-500";
      feedback.textColor = "text-orange-700";
      feedback.width = "w-2/5"; // 40%
      break;

    case 3:
      feedback.text = "Good";
      feedback.background = "bg-yellow-500";
      feedback.textColor = "text-yellow-700";
      feedback.width = "w-3/5"; // 60%
      break;

    case 4:
      feedback.text = "Strong";
      feedback.background = "bg-lime-500";
      feedback.textColor = "text-lime-700";
      feedback.width = "w-4/5"; // 80%
      break;

    case 5:
      feedback.text = "Very Strong";
      feedback.background = "bg-primary-600";
      feedback.textColor = "text-primary-600";
      feedback.width = "w-full"; // 100%
      break;

    default:
      break;
  }

  return feedback;
}
