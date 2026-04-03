import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/minio";

export const maxDuration = 60;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CV_SIZE = 10 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
          allowedTypes: ALLOWED_CV_TYPES,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_CV_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds maximum allowed size of ${(MAX_CV_SIZE / 1024 / 1024).toFixed(0)}MB`,
          maxSize: MAX_CV_SIZE,
          fileSize: file.size,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    const ext = file.name.split(".").pop() || "pdf";
    const uniqueFileName = `cv-${nameWithoutExt}-${timestamp}.${ext}`;

    const result = await uploadFile(buffer, uniqueFileName, file.type);

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        path: result.path,
        fileName: file.name,
      },
    });
  } catch (error) {
    console.error("CV upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload CV";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
