export default function PreviewDocuments() {
  const documents = [
    {
      title: "Machine Learning Notes.pdf",
      size: "2.4 MB",
    },
    {
      title: "Database Systems.docx",
      size: "1.1 MB",
    },
    {
      title: "Computer Networks.pdf",
      size: "3.8 MB",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <h3 className="text-sm font-semibold text-white">
        Recent Documents
      </h3>

      <div className="mt-4 space-y-3">

        {documents.map((doc) => (
          <div
            key={doc.title}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <div>

              <p className="text-sm text-white">
                {doc.title}
              </p>

              <p className="text-xs text-slate-400">
                {doc.size}
              </p>

            </div>

            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
              Indexed
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}