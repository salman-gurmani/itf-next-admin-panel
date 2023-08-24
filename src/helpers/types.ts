export type IndividualMembership = {
  id: string;
  personId: string;
  isActive: boolean;
  validUntil: Date;
  deletedAt: Date | null;
  type: string;
  membershipNumber: string | null;
  martialArtsOrg: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
  isExpired: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isMembershipCardRequested: boolean;
};
export type LeaderOfGroup = {
  id: string;
  groupName: string;
  membershipNumber: string;
  type: string;
  validUntil: Date;
  isExpired: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
export type MemberOfGroups = {
  id: string;
  parentMembership: string;
  membershipNumber: string;
};
