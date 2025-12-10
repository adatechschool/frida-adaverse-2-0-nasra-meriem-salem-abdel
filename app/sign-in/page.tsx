import { signin } from "../actions/connect";

export default function SignInPage() {
    return (
        <form action={signin}>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button type="submit">se connecter</button>
        </form>
    );
}