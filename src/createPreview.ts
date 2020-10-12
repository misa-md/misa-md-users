export default function createPreview(issueType: string, values: any) {
  if (issueType === "new_user") {
    return createNewUser(values);
  }
  return "";
}

function createNewUser({
  repos,
  new_user_org,
  new_user_name,
  new_user_email,
  new_user_areas_of_interest,
  new_user_apply_field,
}: any) {
  return `
  ### Institutions or organizations: 
  ${new_user_org}
  ### Team name or personal preferred name:
  ${new_user_name}
  ### Interest or expertise areas:
  ${new_user_areas_of_interest}
  ### Program(s) used or will be used:
  ${repos}
  ### Will apply this/these program to:
  ${new_user_apply_field}\n\n
  <!--- email will be hidden: ${new_user_email}-->
  `;
}
