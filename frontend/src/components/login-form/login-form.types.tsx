export interface LoginFormComponentProps {
    handleSubmit(e: any): void;
    error: string;
};

export interface LoginFormContainerProps {
    setAuth(boolean: boolean): void;
}