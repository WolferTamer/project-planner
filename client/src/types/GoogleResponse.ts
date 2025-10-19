import type { JwtPayload } from "jwt-decode";

export interface GooglePayload extends JwtPayload {
    email?: string,
    email_verified?: boolean,
    name?: string,
    picture?: string
}