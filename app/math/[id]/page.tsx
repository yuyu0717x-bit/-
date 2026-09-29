import { MathCoursePage } from "@/components/math-course";
export default async function MathPointPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <MathCoursePage id={id} />; }
