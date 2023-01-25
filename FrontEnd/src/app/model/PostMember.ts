export class PostMember{
    constructor(
        public firstName:string,
        public lastName:string,
        public userName:string,
        public password:string,
        public confirmPassword:string,
        public address:string,
        public state:string,
        public city:string,
        public email:string,
        public dateOfBirth:Date
    ){}
}