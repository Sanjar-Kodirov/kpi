import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Descriptions, Tag, Space, Divider, Image, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { ContentUI } from "#ui/content";
import { ROUTES } from "#constants/index";
import { $downloadFile } from "#stores/common";
import { downloadBlobResponse } from "#utils/download";

import { ButtonUI } from "#ui/button";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { $acceptEvaluation, $rejectEvaluation } from "#stores/evaluations";
import { notificationSuccess } from "#ui/notifications";
import { useTranslation } from "react-i18next";
import { useModalControl } from "#hooks/useModalControl";
import { AddEditEvaluationDrawer, AddEditEvaluationDrawerModalProps } from "../addEditDrawer";
import { ModalUI } from "#ui/modal";
import { api } from "#businessLogic/api";

interface EvaluationData {
  id: string;
  user_id: string;
  criteria_id: string;
  evaluation_text: string;
  status: string;
  evaluated_date: string;
  score: number;
  user_name: string;
  user_role: string;
  criteria_title: string;
  region_name: string;
  photo_file_ids?: string[];
  files: {
    id: string;
    file_type: string;
    name: string;
    size: number;
    mime_type: string;
    order_index: 0;
  }[];
}

export const EvaluationDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const addEvaluationModalControl = useModalControl<AddEditEvaluationDrawerModalProps>();

  const evaluationData = location.state as EvaluationData;
  const downloadFileState = $downloadFile.store();
  const acceptEvaluationState = $acceptEvaluation.store();
  const rejectEvaluationState = $rejectEvaluation.store();

  const handleFileDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await api.common.downloadFile(fileId);
      if (response) {
        downloadBlobResponse(
          {
            data: response.data,
            headers: { "content-disposition": `attachment; filename="${fileName}"` },
          },
          fileName,
        );
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleAcceptEvaluation = () => {
    if (!evaluationData.id) return;

    addEvaluationModalControl.openModal({ evaluationId: evaluationData.id });
  };

  const handleEvaluationCallback = () => {
    // Navigate back to evaluations list after successful action
    navigate(ROUTES.EVALUATIONS);
  };

  const handleRejectEvaluation = () => {
    if (!evaluationData.id) return;

    $rejectEvaluation.request({
      evaluation_id: evaluationData.id,
    });
  };

  useEffect(() => {
    if (downloadFileState.data) {
      downloadBlobResponse(
        {
          data: downloadFileState.data,
          headers: {},
        },
        `file_${Date.now()}`,
      );
      $downloadFile.reset();
    }
  }, [downloadFileState.data]);

  useEffect(() => {
    if (rejectEvaluationState.success) {
      notificationSuccess(t("notifications.success"), "Baholash rad etildi");
      navigate(ROUTES.EVALUATIONS);
      $rejectEvaluation.reset();
    }
    return () => {
      $rejectEvaluation.reset();
    };
  }, [rejectEvaluationState.success, navigate, t]);

  if (!evaluationData) {
    return (
      <ContentUI>
        <div>Baholash haqida ma'lumot topilmadi</div>
      </ContentUI>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "orange", text: "Ko'rib chiqilmoqda" };
      case "approved":
        return { color: "green", text: "Tasdiqlangan" };
      case "rejected":
        return { color: "red", text: "Rad etilgan" };
      default:
        return { color: "default", text: status };
    }
  };

  console.log("evaluationData", evaluationData);

  const statusInfo = getStatusInfo(evaluationData.status);
  const formattedDate = new Date(evaluationData.evaluated_date).toLocaleDateString("ru-RU");

  return (
    <ContentUI>
      <ContentUI.Header backPath={ROUTES.EVALUATIONS} title="Baholash" />
      <ContentUI.Middle>
        <Card>
          <Descriptions
            column={1}
            bordered
            labelStyle={{
              width: "200px",
              fontWeight: "bold",
              backgroundColor: "#fafafa",
            }}
          >
            <Descriptions.Item label="F.I.O.">{evaluationData.user_name}</Descriptions.Item>
            <Descriptions.Item label="Lavozim">
              {evaluationData.user_role === "deputy_member" ? "Deputat" : "Moderator"}
            </Descriptions.Item>
            <Descriptions.Item label="Viloyat">{evaluationData.region_name}</Descriptions.Item>
            <Descriptions.Item label="Kriteriy">{evaluationData.criteria_title}</Descriptions.Item>
            <Descriptions.Item label="Baholash sanasi">{formattedDate}</Descriptions.Item>
            <Descriptions.Item label="Baholash">
              <Tag color="blue">{evaluationData.score} ball</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Holat">
              <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Izoh">{evaluationData.evaluation_text || "Izoh yo'q"}</Descriptions.Item>
          </Descriptions>

          {evaluationData.photo_file_ids && evaluationData.photo_file_ids.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Divider orientation="left">Rasmlar</Divider>
              <Space wrap>
                {evaluationData.photo_file_ids.map((photoId, index) => (
                  <Image
                    key={index}
                    width={200}
                    style={{
                      borderRadius: 4,
                      height: "auto",
                      maxWidth: "100%",
                      aspectRatio: "1/1",
                    }}
                    src={`https://kpi-dep.qitmir.uz/api/photos/${photoId}`}
                    alt={`Ilova ${index + 1}`}
                  />
                ))}
              </Space>
            </div>
          )}

          {evaluationData.files && evaluationData.files.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Divider orientation="left">Fayllar</Divider>
              <Space direction="vertical" style={{ width: "100%" }}>
                {evaluationData.files.map((file, index) => (
                  <div
                    key={file.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => handleFileDownload(file.id, file.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.borderColor = "#1890ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#d9d9d9";
                    }}
                  >
                    <DownloadOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                    <Typography.Text strong style={{ flex: 1 }}>
                      {file.name}
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                      {file.file_type} • {(file.size / 1024).toFixed(1)} KB
                    </Typography.Text>
                  </div>
                ))}
              </Space>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <ButtonUI onClick={handleAcceptEvaluation} size="small" type="primary">
              Qabul qilish
            </ButtonUI>
            <ModalConfirmUI title="Baholashni rad etish" onOk={handleRejectEvaluation}>
              <ButtonUI
                onClick={handleRejectEvaluation}
                size="small"
                type="secondary"
                loading={rejectEvaluationState.loading}
              >
                Rad etish
              </ButtonUI>
            </ModalConfirmUI>
          </div>
        </Card>
      </ContentUI.Middle>
      <ModalUI open={addEvaluationModalControl.modalProps.visible} onCancel={addEvaluationModalControl.closeModal}>
        <AddEditEvaluationDrawer modalControl={addEvaluationModalControl} callBack={handleEvaluationCallback} />
      </ModalUI>
    </ContentUI>
  );
};
