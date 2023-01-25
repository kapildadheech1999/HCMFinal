export class Member{
    constructor(
        public memberId: number,
        public firstName:string,
        public lastName:string,
        public userName:string,
        public address:string,
        public state:string,
        public city:string,
        public email:string,
        public dateOfBirth:Date,
        public physicianId:number,
        public physicianName:string
    ){}
}