import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest ) {
  const data = [
    { msg : "안녕하세요"},
    { msg : "반가워용"},
    { msg : "부산대학교 K-digital"}
  ]
  return (
    NextResponse.json(data)
  );
}