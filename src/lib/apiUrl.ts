export function tableApiURL(type: string) {
  switch (type) {
    case "list_user":
      return "http://localhost:5000/users";
    default:
      return "/";
  }
}
