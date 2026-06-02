import { MembersPageHeaderPresentational } from "./MembersPageHeaderPresentationalComponent";

type Props = {
  onAddMember: () => void;
};

export function MembersPageHeaderContainer({ onAddMember }: Props) {
  return <MembersPageHeaderPresentational onAddMember={onAddMember} />;
}
