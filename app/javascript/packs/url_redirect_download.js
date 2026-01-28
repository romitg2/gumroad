import ReactOnRails from "react-on-rails";

import BasePage from "$app/utils/base_page";

import { WithContent as DownloadPageWithContent } from "$app/components/DownloadPage/WithContent";
import DownloadPageWithoutContent from "$app/components/server-components/DownloadPage/WithoutContent";

BasePage.initialize();

ReactOnRails.default.register({ DownloadPageWithContent, DownloadPageWithoutContent });
