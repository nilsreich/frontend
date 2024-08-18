import { useState, useMemo, useEffect } from "react";
import { RefreshCw, Eye, EyeOff, TvMinimal } from "lucide-react";
import katex from "katex";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Videofile from "@/videos/addition.mp4";

// Importieren Sie die JSON-Daten direkt
import mathTasksData from "../lib/data.json";

const MathTasks = ({ path }: { path: string }) => {
  const [showSolutions, setShowSolutions] = useState(false);

  const categoryTasks = useMemo(() => {
    return mathTasksData[path] || [];
  }, [path]);

  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    setTasks([...categoryTasks].sort(() => Math.random() - 0.5).slice(0, 10));
    setShowSolutions(false);
  };

  useEffect(() => {
    loadTasks();
  }, [categoryTasks]);

  const renderContent = (content) => {
    const mathPaths = [
      'grundrechenarten/einfacherDreisatz',
      'grundrechenarten/verschachtelterDreisatz',
      'grundrechenarten/umgekehrterDreisatz',
      'grundrechenarten/schwierigeProzentrechnung',
    ];
  
    if (mathPaths.includes(path)) {
      return content;
    }
    
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(content),
        }}
        className="break-normal"
      />
    );
  };

  return (
    <div className="text-slate-700">
      <div className="flex -mt-4 text-sm items-center">
        <button className="flex items-center gap-2 " onClick={loadTasks}>
          <RefreshCw size={16} />
          <span>Aufgaben</span>
        </button>
        <div className="mx-4">|</div>
        <button
          className="flex items-center gap-2"
          onClick={() => setShowSolutions(!showSolutions)}
        >
          {showSolutions ? (
            <>
              <EyeOff size={16} />
              <span>Lösungen</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span>Lösungen</span>
            </>
          )}
        </button>
        <div className="mx-4">|</div>
{/*

        <Dialog>
          <DialogTrigger className="flex gap-2 items-center">
            <TvMinimal size={16} />
            <span>Erklärung</span>
          </DialogTrigger>
          <DialogContent className="bg-slate-50 font-sans font-light text-slate-800 ">
            <DialogHeader>
              <DialogTitle className="font-sans">
                Schriftliche Addition
              </DialogTitle>
            </DialogHeader>
            <div className=" font-semibold">Anleitung</div>
            <div>
              Zahlen zu addieren ist ein grundlegender mathematischer Vorgang.
              Man beginnt in der Regel rechts mit der Einerstelle und arbeitet
              sich nach links vor. Die Ziffern in jeder Spalte werden
              zusammengezählt. Übersteigt die Summe 9, wird der Übertrag in die
              nächste Spalte übernommen. Dieser Prozess wiederholt sich, bis
              alle Ziffern addiert sind. Das Ergebnis ist die Gesamtsumme der
              addierten Zahlen.
            </div>
            <div className="font-semibold">Beispiel</div>
            <div
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(
                  "\\begin{array}{r}\\color{red}{\\scriptstyle 1} \\phantom{1}  \\color{red}{\\scriptstyle 1} \\phantom{1} \\\\ 123 \\\\+ 456\\\\ \\hline 579\\end{array}",
                  { displayMode: true }
                ),
              }}
            />
            <div className=" font-semibold">Video</div>
            <video controls src={Videofile} className="rounded" />{" "}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <button type="button" className="font-sans">
                  Close
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>*/}

      </div>
      <ol className="list-[lower-latin] list-inside -ml-8">
        {tasks.map((task, index) => (
          <li key={index} className="my-4">
            {renderContent(task.question)}{" "}
            {showSolutions && (
              <span className="font-bold">
                {renderContent(task.solution)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MathTasks;