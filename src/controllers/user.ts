interface LoginResponse {
    user: SessionUser
}

interface SessionUser {
    id: string;
    username: string;
}

export const login = async (credentials: Record<string, string>): Promise<LoginResponse> => {
    return { user: { id: "1", username: "test" } };
}