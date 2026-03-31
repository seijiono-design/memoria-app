"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Share2, MessageCircle, Link2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { shareCopy, shareThemes } from "@/lib/memoria/constants";
import { EnrichedAnniversaryItem, ShareLanguage } from "@/types/memoria";
import { ShareImageCard } from "@/components/memoria/share-image-card";

export function ShareSheet({ item }: { item: EnrichedAnniversaryItem }) {
  const [selectedTheme, setSelectedTheme] = useState<typeof shareThemes[number]>(shareThemes[0]);
  const [language, setLanguage] = useState<ShareLanguage>("en");
  const [status, setStatus] = useState("");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const copy = shareCopy[language];
  const shareUrl = `https://memoria.app/share/${item.id}`;

  const exportCardAsPng = async () => {
    const node = cardRef.current;
    if (!node) throw new Error("Share card is not ready");
    return toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: "#0f172a" });
  };

  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };

  const copyToClipboard = async (text: string) => {
    if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = async () => {
    try {
      const dataUrl = await exportCardAsPng();
      downloadDataUrl(dataUrl, `memoria-${item.id}.png`);
      setStatus(copy.pngExported);
    } catch (error) {
      console.error(error);
      setStatus(copy.pngExportFailed);
    }
  };

  const handleNativeShare = async () => {
    const text = `${copy.caption(item)} ${copy.hashtags.join(" ")}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, text, url: shareUrl });
        setStatus(copy.shareSuccess);
        return;
      }
      await copyToClipboard(`${text} ${shareUrl}`);
      setStatus(copy.shareFallback);
    } catch (error) {
      console.error(error);
      setStatus(copy.shareUnavailable);
    }
  };

  const openShareWindow = async (type: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedXText = encodeURIComponent(`${copy.xText(item)} ${copy.hashtags.join(" ")}`);
    const encodedLineText = encodeURIComponent(`${copy.lineText(item)} ${shareUrl}`);

    if (type === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedXText}&url=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (type === "instagram") {
      await handleNativeShare();
      return;
    }

    if (type === "line") {
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedLineText}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    try {
      await copyToClipboard(shareUrl);
      setStatus(copy.copied);
    } catch (error) {
      console.error(error);
      setStatus(copy.shareUnavailable);
    }
  };

  const shareOptions = [
    { key: "x", label: copy.xLabel, icon: Share2, tone: "bg-slate-900 text-white", text: copy.xText(item) },
    {
      key: "instagram",
      label: copy.instagramLabel,
      icon: Share2,
      tone: "bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 text-white",
      text: copy.instagramText(item),
    },
    { key: "line", label: copy.lineLabel, icon: MessageCircle, tone: "bg-emerald-500 text-white", text: copy.lineText(item) },
    { key: "copy", label: copy.copyLinkLabel, icon: Link2, tone: "bg-slate-100 text-slate-800", text: shareUrl.replace("https://", "") },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-md">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
            <Share2 className="h-5 w-5 text-slate-800" />
          </div>
          <div>
            <div className="font-semibold">{copy.shareTitle}</div>
            <div className="text-sm text-slate-500">{copy.shareDescription}</div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["ja", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  language === lang ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {shareCopy[lang].label}
              </button>
            ))}
          </div>
          <Button variant="outline" className="rounded-2xl" onClick={handleNativeShare}>
            {copy.nativeShare}
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {shareThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedTheme(theme)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                selectedTheme.id === theme.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        <div ref={cardRef} className="rounded-[28px] bg-slate-900 p-3">
          <ShareImageCard item={item} theme={selectedTheme} language={language} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => openShareWindow(option.key)}
                className="rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${option.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium">{option.label}</div>
                    <div className="truncate text-xs text-slate-500">{option.text}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button className="h-11 rounded-2xl bg-slate-900 hover:bg-slate-800" onClick={handleDownload}>
            {copy.generateImage}
          </Button>
          <Button variant="outline" className="h-11 rounded-2xl">
            {copy.saveTemplate}
          </Button>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-slate-700">{copy.previewTitle}</div>
            {status ? <div className="text-xs text-slate-500">{status}</div> : null}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">{copy.caption(item)}</div>
          <div className="mt-3 flex gap-2">
            {copy.hashtags.map((tag) => (
              <Badge key={tag} className="rounded-full bg-slate-100 text-slate-800 hover:bg-slate-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}