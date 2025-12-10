import { signup } from "../actions/connect";

export default function SignUpPage() {
    return (
        <form action={signup}>
            <input type="text" name="name"></input>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button type="submit">s'inscrire</button>
        </form>
    );
}