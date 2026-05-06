import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
  generateResumeLatex,
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  // =========================
  // Generate Interview Report
  // =========================
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    let response = null;

    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response?.interviewReport;
  };

  // =========================
  // Get Report By ID
  // =========================
  const getReportById = async (interviewId) => {
    setLoading(true);

    let response = null;

    try {
      response = await getInterviewReportById(interviewId);

      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response?.interviewReport;
  };

  // =========================
  // Get All Reports
  // =========================
  const getReports = async () => {
    setLoading(true);

    let response = null;

    try {
      response = await getAllInterviewReports();

      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response?.interviewReports;
  };

  // =========================
  // Download Resume PDF
  // =========================
  const getResumePdf = async (interviewReportId, templateId = 1) => {
    setLoading(true);

    try {
      const response = await generateResumePdf({
        interviewReportId,
        templateId,
      });

      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: "application/pdf",
        }),
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `resume_${interviewReportId}_template${templateId}.pdf`,
      );

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Download Resume LaTeX
  // =========================
  const getResumeLatex = async (interviewReportId, templateId = 1) => {
    setLoading(true);

    try {
      await generateResumeLatex({
        interviewReportId,
        templateId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Auto Fetch
  // =========================
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    getResumeLatex,
  };
};
