export interface CreateArticleDto {
    title: string,
    description: string
}
export interface UpdateArticleDto {
    title?: string,
    description?: string
}
export interface CreateUserDto {
    email: string,
    username: string,
    password: string
}
export interface LoginDto {
    email: string,
    password: string    
}
export interface UpdateProfileDto {
    username?: string,
    email?: string,
    password?: string
}
export interface CreateCommentDto {
    text: string,
    articleId: number
}
export interface EditCommentDto {
    text: string,
}