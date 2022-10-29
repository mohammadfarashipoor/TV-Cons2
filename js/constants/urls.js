export const BASE_URL = `${window.location.origin}/o/headless-club/v1.0`;

export const LEVEL_GET_ALL_URL = `${BASE_URL}/sites/{siteId}/admin/levels`;
export const LEVEL_GET_SINGLE_URL = `${BASE_URL}/admin/levels/{levelId}`;

export const LEVEL_DELETE_SINGLE_URL = `${BASE_URL}/admin/levels/{levelId}`;
export const LEVEL_DELETE_GROUP_URL = `${BASE_URL}/sites/{siteId}/admin/campaigns/deleteGroupCampaigns?levelsId={levelIds}`;

export const LEVEL_POST_URL = `${BASE_URL}/sites/{siteId}/admin/levels`;

export const LEVEL_PUT_URL = `${BASE_URL}/admin/levels/{levelId}`;
