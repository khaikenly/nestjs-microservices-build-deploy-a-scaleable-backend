import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttp } from './i-http.interface';
import { HttpModuleOptions } from '@nestjs/axios';

export class HttpService implements IHttp {
  private readonly axiosInstance: AxiosInstance;

  constructor(config?: HttpModuleOptions) {
    this.axiosInstance = axios.create(config);
  }

  public async get<T>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config,
    );

    return response.data;
  }

  public async post<T>(
    url: string,
    data: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );

    return response.data;
  }

  public async put<T>(
    url: string,
    data: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );

    return response.data;
  }
  public async patch<T>(
    url: string,
    data: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config,
    );

    return response.data;
  }
  public async delete<T>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config,
    );

    return response.data;
  }
}
