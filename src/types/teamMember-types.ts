export interface PostTeamMemberDto {
  name: string;
  position: string;
  file: Express.Multer.File | undefined;
}

export interface GetTeamMembersQueryDto {
  limit?: string;
  sort?: 'asc' | 'desc';
}
