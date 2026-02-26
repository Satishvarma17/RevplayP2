import { Component, OnInit } from '@angular/core';
import {
  AnalyticsService,
  Overview,
  SongAnalytics,
  TopListener,
  TrendResponse
} from 'src/app/core/services/analytics.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  artistId = 1; // for testing

  overview?: Overview;
  songs: SongAnalytics[] = [];
  topSongs: SongAnalytics[] = [];
  topListeners: TopListener[] = [];
  trendType: 'daily' | 'weekly' | 'monthly' = 'monthly';
  private trendChart?: Chart;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadOverview();
    this.loadSongs();
    this.loadTopSongs();
    this.loadTrends();
    this.loadTopListeners();
  }

  loadOverview() {
    this.analyticsService.getOverview(this.artistId)
      .subscribe(data => this.overview = data);
  }

  loadSongs() {
    this.analyticsService.getSongs(this.artistId)
      .subscribe(data => this.songs = data);
  }

  loadTopSongs() {
    this.analyticsService.getTopSongs(this.artistId)
      .subscribe(data => this.topSongs = data);
  }

  loadTrends() {
    this.analyticsService.getTrends(this.artistId, this.trendType)
      .subscribe(data => {
        const labels = data.map((point: TrendResponse) => point.label);
        const values = data.map((point: TrendResponse) => point.count);

        this.trendChart?.destroy();
        this.trendChart = new Chart("trendChart", {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Monthly Plays',
              data: values
            }]
          }
        });
      });
  }

  onTrendTypeChange(type: 'daily' | 'weekly' | 'monthly') {
    this.trendType = type;
    this.loadTrends();
  }

  loadTopListeners() {
    this.analyticsService.getTopListeners(this.artistId)
      .subscribe(data => this.topListeners = data);
  }
}
