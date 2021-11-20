class Solution {
    public int uniquePathsIII(int[][] arr) {
        int n=arr.length;
        int m=arr[0].length;
        int sr=0,sc=0,er=0,ec=0;
        int c=0;
        int[][]dp=new int[n][m];
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(arr[i][j]==1){
                    sr=i;
                    sc=j;
                }
                if(arr[i][j]==2){
                    er=i;
                    ec=j;
                }
                dp[i][j]=-1;
                if(arr[i][j]==-1)
                   c++;
            }
        }
        boolean [][]vis=new boolean [n][m];
        return sol(sr,sc,er,ec,arr,dp,vis,0,n*m-c-1);
    }
    public int sol(int sr,int sc,int er,int ec,int[][]arr,int[][]dp,boolean [][]vis,int c,int obs){
        if(sr==er && sc==ec){
            if(c==obs)
                return 1;
            return 0;
        }
        int n=arr.length;int m=arr[0].length;
        if(sr<0 || sc<0 || sr>=n || sc>=m || arr[sr][sc]==-1 || vis[sr][sc]){
            return 0;
        }
        // if(dp[sr][sc]!=-1)
        // return dp[sr][sc];
        vis[sr][sc]=true;

        int res=0;
        res+=sol(sr+1,sc,er,ec,arr,dp,vis,c+1,obs);
        res+=sol(sr,sc+1,er,ec,arr,dp,vis,c+1,obs);
        res+=sol(sr-1,sc,er,ec,arr,dp,vis,c+1,obs);
        res+=sol(sr,sc-1,er,ec,arr,dp,vis,c+1,obs);
        vis[sr][sc]=false;

        return dp[sr][sc]=res;
    }
}