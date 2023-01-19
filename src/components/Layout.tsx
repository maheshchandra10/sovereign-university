import Head from "next/head";
import Header from "components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="Layout">
        <Header />
        <main className="h-full">{children}</main>

        <style jsx global>{`
          .Layout {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
          }
        `}</style>
      </div>
    </>
  );
}
