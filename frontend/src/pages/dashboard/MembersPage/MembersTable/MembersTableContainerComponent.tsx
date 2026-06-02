import type { MemberWithProfile } from "../types";
import { MembersTablePresentational } from "./MembersTablePresentationalComponent";

type Props = {
  members: MemberWithProfile[];
};

export function MembersTableContainer({ members }: Props) {
  return <MembersTablePresentational members={members} />;
}
