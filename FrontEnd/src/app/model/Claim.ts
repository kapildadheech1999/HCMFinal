export class Claim{
    constructor(
        public claimType: string,
        public claimAmount: number,
        public remarks: string,
        public memberId: number
    ){}
}