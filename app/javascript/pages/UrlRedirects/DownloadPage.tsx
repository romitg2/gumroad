import { usePage, usePoll } from "@inertiajs/react";
import * as React from "react";

import { usePersistentExternalScript } from "$app/hooks/usePersistentExternalScript";
import { LoggedInUserLayout } from "$app/inertia/layout";
import FileUtils from "$app/utils/file";

import { FileItem } from "$app/components/Download/FileList";
import { LayoutProps } from "$app/components/DownloadPage/Layout";
import { ContentProps, WithContent } from "$app/components/DownloadPage/WithContent";

const DROPBOX_SCRIPT_URL = "https://www.dropbox.com/static/api/2/dropins.js";
const AUDIO_DURATIONS_POLL_INTERVAL_MS = 5_000;
const LATEST_MEDIA_LOCATIONS_POLL_INTERVAL_MS = 10_000;

type PageProps = LayoutProps & {
  content: ContentProps;
  product_has_third_party_analytics: boolean | null;
  audio_durations?: Record<string, number | null>;
  latest_media_locations?: Record<string, FileItem["latest_media_location"]>;
  dropbox_api_key: string;
};

function DownloadPage() {
  const props = usePage<PageProps>().props;

  usePersistentExternalScript(DROPBOX_SCRIPT_URL, { id: "dropboxjs", "data-app-key": props.dropbox_api_key });

  const contentFiles = React.useMemo(
    () => props.content.content_items.filter((item): item is FileItem => item.type === "file"),
    [props.content.content_items],
  );
  const hasRichContent = props.content.rich_content_pages !== null;
  const hasContentFiles = contentFiles.length > 0;
  const hasContentFilesWithMissingDurations = React.useMemo(
    () =>
      contentFiles.some(
        (file) =>
          FileUtils.isAudioExtension(file.extension) &&
          (props.audio_durations?.[file.id] ?? file.duration) === null,
      ),
    [contentFiles, props.audio_durations],
  );

  const { start: startAudioDurationsPoll, stop: stopAudioDurationsPoll } = usePoll(
    AUDIO_DURATIONS_POLL_INTERVAL_MS,
    { only: ["audio_durations"] },
    { autoStart: false },
  );
  const { start: startLatestMediaLocationsPoll, stop: stopLatestMediaLocationsPoll } = usePoll(
    LATEST_MEDIA_LOCATIONS_POLL_INTERVAL_MS,
    { only: ["latest_media_locations"] },
    { autoStart: false },
  );

  React.useEffect(() => {
    if (hasRichContent && props.is_mobile_app_web_view && hasContentFilesWithMissingDurations) {
      startAudioDurationsPoll();
    } else {
      stopAudioDurationsPoll();
    }
  }, [hasRichContent, props.is_mobile_app_web_view, hasContentFilesWithMissingDurations]);

  React.useEffect(() => {
    if (hasRichContent && hasContentFiles) {
      startLatestMediaLocationsPoll();
    } else {
      stopLatestMediaLocationsPoll();
    }
  }, [hasRichContent, hasContentFiles]);

  return <WithContent {...props} />;
}

DownloadPage.layout = (page: React.ReactNode) => <LoggedInUserLayout>{page}</LoggedInUserLayout>;
export default DownloadPage;
